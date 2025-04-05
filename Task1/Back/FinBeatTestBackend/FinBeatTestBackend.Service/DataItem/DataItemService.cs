using FinBeatTestBackend.Data;
using FinBeatTestBackend.Data.Helpers;
using FinBeatTestBackend.Data.Model;
using FinBeatTestBackend.Service.DataItem.Dto;
using Microsoft.EntityFrameworkCore;

namespace FinBeatTestBackend.Service.DataItem;

public class DataItemService(AppDbContext dbContext) : IDataItemService
{
    public async Task SetDataItemsAsync(IEnumerable<SetDataItemRequestDto> items)
    {
        Dictionary<int, string> sortedItems = items
            .Select(kvp => new KeyValuePair<int, string>(int.Parse(kvp.Key), kvp.Value))
            .OrderBy(kvp => kvp.Key)
            .ToDictionary();

        // Truncate table
        await dbContext.DataItems.TruncateAsync();

        // New data
        IEnumerable<DataItemModel> entities = sortedItems.Select((item, index) => new DataItemModel
        {
            Id = index + 1,
            Code = item.Key,
            Value = item.Value
        });

        await dbContext.DataItems.AddRangeAsync(entities);
        await dbContext.SaveChangesAsync();
    }

    public async Task<GetDataItemsResponseDto> GetDataItemsAsync(
        int? codeFilter,
        string? valueFilter,
        int pageNumber,
        int pageSize)
    {
        IQueryable<DataItemModel> query = dbContext.DataItems;
        // filters
        if (codeFilter.HasValue)
        {
            query = query.Where(item => item.Code == codeFilter.Value);
        }

        if (!string.IsNullOrEmpty(valueFilter))
        {
            query = query.Where(item => item.Value == valueFilter);
        }

        // pagination
        int totalCount = await query.CountAsync();
        List<GetDataItemResponseDto> items = await query
            .OrderBy(item => item.Code)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(item => new GetDataItemResponseDto
            {
                Id = item.Id,
                Code = item.Code,
                Value = item.Value
            })
            .ToListAsync();

        return new GetDataItemsResponseDto
        {
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Items = items
        };
    }
}
