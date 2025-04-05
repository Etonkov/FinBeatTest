using FinBeatTestBackend.Service.DataItem;
using FinBeatTestBackend.Service.DataItem.Dto;
using FinBeatTestBackend.Service.ValidationAttributes.SetDataItemRequest;
using Microsoft.AspNetCore.Mvc;

namespace FinBeatTestBackend.Api.Controllers;

[ApiController]
[Route("api/v{version:apiVersion}/items")]
public class DataItemController(IDataItemService service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> SetItemsAsync(
        [FromBody] [DataItemKeyUnique] [DataItemValueUnique]
        IEnumerable<SetDataItemRequestDto> inputData)
    {
        await service.SetDataItemsAsync(inputData);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetItemsAsync(
        [FromQuery] int? codeFilter = null,
        [FromQuery] string? valueFilter = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        GetDataItemsResponseDto result = await service.GetDataItemsAsync(codeFilter, valueFilter, pageNumber, pageSize);
        return Ok(result);
    }
}
