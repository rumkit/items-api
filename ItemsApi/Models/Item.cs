using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemsApi.Models;

public class Item
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public List<SubItem> SubItems { get; set; }
}
