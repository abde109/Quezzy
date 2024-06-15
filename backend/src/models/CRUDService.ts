// CRUDService.ts
import { Document, FilterQuery, Model } from 'mongoose';

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
  
  
  async update(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!item) throw new Error('Item not found');
      return item;
    } catch (err) {
      throw new Error('Error updating item');
    }
  }

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
