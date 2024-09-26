// CRUDService.ts
import { Request } from 'express';
import { Document, FilterQuery, Model } from 'mongoose';


import 'express-session';

declare module 'express-session' {
  interface Session {
    user?: any; // Define your custom session data type here
  }
}

class CRUDService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch (err) {
      throw new Error('Error fetching data');
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const item = await this.model.findById(id);
      if (!item) throw new Error('Item not found');
      return item;
    } catch (err) {
      throw new Error('Error fetching item');
    }
  }

  async getBy(query: FilterQuery <T>): Promise<T | null> {
    try {
      const item = await this.model.findOne(query)
      if (!item) return null ;
      return item;
    } catch (err : any) {
      throw new Error('Error fetching item');
    }
  }

   async getManyBy(query: FilterQuery<T>): Promise<T[]> {
    try {
      return await this.model.find(query);
    } catch (err) {
      throw new Error('Error fetching items');
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const item = new this.model(data);
      const savedItem = await item.save();
      return savedItem as T;
    } catch (err) {
      throw new Error(`Error creating item: ${err}`);
    }
  }
  

  async update(id: string, data: Partial<T>, req: Request): Promise<T | null> {
    try {
        console.log('Updating item with data:', data);

        // Update the item in the database and return the updated item
        const item = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        if (!item) {
            console.log('Item not found:', id);
            throw new Error('Item not found');
        }

        // Log the item updated from the database
        console.log('Item updated in DB:', item);

        // Update session with the new item data
        req.session.user = { ...req.session.user, ...item.toObject() }; // Spread the existing session data and merge with updated item

        // Log the session before saving to verify
        console.log('Session before saving:', req.session);

        // Save the session to persist changes
        await req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
            } else {
                console.log('Session saved successfully:', req.session);
            }
        });

        return item;
    } catch (err) {
        console.log('Error updating item:', err);
        throw new Error('Error updating item');
    }
}

  
// async update(id: string, data: Partial<T>, req: Request): Promise<T | null> {
//   try {
//     console.log('Updating item with data:', data);

//     // Update the item in the database and return the updated item
//     const item = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });

//     if (!item) {
//       console.log('Item not found:', id);
//       throw new Error('Item not found');
//     }

//     // Log the item updated from the database
//     console.log('Item updated in DB:', item);

//     // Update session with the new item data
//     req.session.user = item;
    
//     // Log the session before saving to verify
//     console.log('Session before saving:', req.session);

//     // Save the session
//     // await req.session.save();

//     // Log the session after saving
//     console.log('Session after saving:', req.session);
//     console.log('Session after saving:', req.body);

//     return item;
//   } catch (err) {
//     console.log('Error updating item:', err);
//     throw new Error('Error updating item');
//   }
// }



  async delete(id: string): Promise<T | null> {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item) throw new Error('Item not found');
      return item;
    } catch (err) {
      throw new Error('Error deleting item');
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.model.deleteMany({});
    } catch (err) {
      throw new Error('Error deleting all items');
    }
  }
}

export default CRUDService;
