using System.ComponentModel.DataAnnotations;

namespace FinBeatTestBackend.Api.ValidationAttributes;

public class ValidateDictionaryValuesRequiredAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            List<string> wrongKeys = new();
            foreach (KeyValuePair<string, string> item in keyValuePairs)
            {
                if (string.IsNullOrWhiteSpace(item.Value))
                {
                    wrongKeys.Add($"'{item.Key}'");
                }
            }

            if (wrongKeys.Count > 0)
            {
                return new ValidationResult($"Value for next keys cannot be empty: {string.Join(", ", wrongKeys)}");
            }
        }

        return ValidationResult.Success;
    }
}
