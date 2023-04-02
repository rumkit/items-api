using ItemsApi.Models;
using ItemsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ItemsApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ApiController : ControllerBase
{
    private readonly ILogger<ApiController> _logger;
    private readonly IItemsService _itemsService;

    public ApiController(IItemsService itemsService, ILogger<ApiController> logger)
    {
        _logger = logger;
        _itemsService = itemsService;
    }

    [HttpGet("items")]
    public async Task<IEnumerable<Item>> GetItems()
    {
        return await _itemsService.GetAsync();
    }

    [HttpGet("item")]
    public async Task<ActionResult<Item>> GetItem(string id)
    {
        var item = await _itemsService.GetAsync(id);

        if(item == null)
        {
            return NotFound();
        }

        return item;
    }

    [HttpPost("item")]
    public async Task<IActionResult> CreateItem(int subItemsCount = 4)
    {
        var subItems = Enumerable.Range(0, subItemsCount)
            .Select(i => new SubItem { Id = i, Status = ProcessingStatus.Created });
        var newItem = new Item { SubItems = subItems.ToList() };
        await _itemsService.CreateAsync(newItem);

        return CreatedAtAction(nameof(GetItem), new { id = newItem.Id }, newItem);
    }

    [HttpDelete("item")]
    public async Task<IActionResult> DeleteItem(string id)
    {
        var item = await _itemsService.GetAsync(id);

        if(item == null)
        {
            return NotFound();
        }

        await _itemsService.RemoveAsync(id);

        return NoContent();
    }
}
