namespace FinBeatTestBackend.Service.DataItem.Dto;

public class GetDataItemResponseDto
{
    public long Id { get; init; }
    public int Code { get; init; }
    public required string Value { get; init; }
}
