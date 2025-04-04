using FinBeatTestBackend.Service.DataItem.Dto;

namespace FinBeatTestBackend.Service.DataItem;

public interface IDataItemService
{
    Task SetDataItemsAsync(IEnumerable<KeyValuePair<string, string>> items);

    Task<GetDataItemsResponseDto> GetDataItemsAsync(
        int? codeFilter,
        string? valueFilter,
        int pageNumber,
        int pageSize);
}
