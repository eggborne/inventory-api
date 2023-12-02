import express from 'express';
import sequelize from './sequelize';
import { FindOptions, WhereOptions, Op } from 'sequelize';
import Item from './models/item';
import Listing from './models/listing';
import Sale from './models/sale';

interface ItemQueryParams {
  id?: number;
  fullName?: string;
  shortName?: string;
  description?: string;
  buyDate?: Date;
  boughtFor?: number;
  source?: string;
  condition?: string;
  suggestedValue?: number;
}

const app = express();
const port = process.env.PORT || 3000;

Item.hasMany(Listing, {
  foreignKey: 'itemId',
});

Listing.belongsTo(Item, {
  foreignKey: 'itemId',
});

Listing.hasOne(Sale, {
  foreignKey: 'listingId',
});

Sale.belongsTo(Listing, {
  foreignKey: 'listingId',
});


console.log("Current environment:", process.env.NODE_ENV);
const runningLocally = __dirname.includes('dist');
console.log('Running locally:', runningLocally);

app.use(express.json());

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const prefix = runningLocally ? '' : '/inventory-api';

app.get(`${prefix}/items`, async (req, res) => {

  const queryOptions: FindOptions = {
    where: {} as WhereOptions
  };

  const queryParams: ItemQueryParams = req.query as ItemQueryParams;

  for (const [key, value] of Object.entries(queryParams)) {
    const isAmount = key === 'boughtFor' || key === 'suggestedPrice';
    const hasKeywords = key === 'fullName' || key === 'shortName' || key === 'description' || key === 'source';
    console.log('typeof', value, 'is', typeof value);
    if (hasKeywords) {      
      (queryOptions.where as any)[key] = { [Op.like]: `%${value}%` };
    } else {
      (queryOptions.where as any)[key] = { [Op.eq]: value };
    }
  }

  try {
    const items = await Item.findAll(queryOptions);
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items with search parameters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get(`${prefix}/listings`, async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: [Item] // Include related Item data
    });
    res.json(listings);
  } catch (error) {
    res.status(500).send(error!.toString());
  }
});

app.get(`${prefix}/sales`, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [Listing] // Include related Item and Listing data
    });
    res.json(sales);
  } catch (error) {
    res.status(500).send(error!.toString());
  }
});

app.post(`${prefix}/items`, async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating new item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post(`${prefix}/listings`, async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    console.error('Error creating new listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post(`${prefix}/sales`, async (req, res) => {
  try {
    const newSale = await Sale.create(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating new sale:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database tables created!");
}).then(() => {
  app.listen(port, () => {
    console.log(`\nServer running on http://localhost:${port}`);
  });
  testDBConnection();
}).catch((error) => {
  console.error('Error during Sequelize sync:', error);
});
