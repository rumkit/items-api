using ItemsApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ItemsApi.Services;

public interface IItemsService
{
    Task CreateAsync(Item newItem);
    Task<List<Item>> GetAsync();
    Task<Item> GetAsync(string id);
    Task RemoveAsync(string id);
    Task UpdateAsync(string id, Item updatedItem);
}

public class ItemsService : IItemsService
{
    private readonly IMongoCollection<Item> _itemsCollection;

    public ItemsService(
        IOptions<ItemsDataBaseSettings> bookStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bookStoreDatabaseSettings.Value.DatabaseName);

        _itemsCollection = mongoDatabase.GetCollection<Item>(
            bookStoreDatabaseSettings.Value.CollectionName);
    }

    public async Task<List<Item>> GetAsync() =>
        await _itemsCollection.Find(_ => true).ToListAsync();

    public async Task<Item> GetAsync(string id) =>
        await _itemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Item newItem) =>
        await _itemsCollection.InsertOneAsync(newItem);

    public async Task UpdateAsync(string id, Item updatedItem) =>
        await _itemsCollection.ReplaceOneAsync(x => x.Id == id, updatedItem);

    public async Task RemoveAsync(string id) =>
        await _itemsCollection.DeleteOneAsync(x => x.Id == id);
}