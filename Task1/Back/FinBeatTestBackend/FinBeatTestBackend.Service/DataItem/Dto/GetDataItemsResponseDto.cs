namespace FinBeatTestBackend.Service.DataItem.Dto;

public class GetDataItemsResponseDto
{
    public int TotalCount { get; init; }
    public int PageNumber { get; init; }
    public int PageSize { get; init; }
    public IEnumerable<GetDataItemResponseDto> Items { get; init; } = Array.Empty<GetDataItemResponseDto>();
}
