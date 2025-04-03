using FinBeatTestBackend.Data;
using FinBeatTestBackend.Service.DataItem.Dto;

namespace FinBeatTestBackend.Service.DataItem;

public class DataItemService (AppDbContext dbContext) : IDataItemService
{
    public async Task SetDataItemsAsync(IDictionary<int, string>[] items)
    {
    }

    public async Task<GetDataItemsResponseDto> GetDataItemsAsync(
        int? codeFilter,
        string? valueFilter,
        int pageNumber,
        int pageSize)
    {
        return new GetDataItemsResponseDto();
    }
}
