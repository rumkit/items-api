using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemsApi.Models;

public class SubItem
{
    public int Id { get; set; }

    public ProcessingStatus Status { get; set; }
}