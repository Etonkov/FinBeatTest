using System.ComponentModel.DataAnnotations;
using FinBeatTestBackend.Service.DataItem.Dto;

namespace FinBeatTestBackend.Service.ValidationAttributes.SetDataItemRequest;

public class DataItemValueUniqueAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is IEnumerable<SetDataItemRequestDto> dataItems)
        {
            IEnumerable<string> duplicateValues = dataItems
                .GroupBy(x => x.Value)
                .Where(x => x.Count() > 1)
                .Select(x => $"'{x.Key}'")
                .ToArray();

            if (duplicateValues.Any())
            {
                return new ValidationResult($"Array have duplicate values: {string.Join(", ", duplicateValues)}");
            }
        }

        return ValidationResult.Success;
    }
}
