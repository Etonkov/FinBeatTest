using System.ComponentModel.DataAnnotations;

namespace FinBeatTestBackend.Api.ValidationAttributes;

public class ValidateDictionaryValuesLengthAttribute(int maxLength) : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            List<string> wrongKeys = new();
            foreach (KeyValuePair<string, string> item in keyValuePairs)
            {
                if (item.Value.Length > maxLength)
                {
                    wrongKeys.Add($"'{item.Key}'");
                }
            }

            if (wrongKeys.Count > 0)
            {
                return new ValidationResult(
                    $"Values must be less than {maxLength} characters. Invalid keys of these values: {string.Join(", ", wrongKeys)}");
            }
        }

        return ValidationResult.Success;
    }
}
