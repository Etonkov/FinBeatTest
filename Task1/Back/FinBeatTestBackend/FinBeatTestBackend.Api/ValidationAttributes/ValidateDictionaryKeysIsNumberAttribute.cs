using System.ComponentModel.DataAnnotations;

namespace FinBeatTestBackend.Api.ValidationAttributes;

public class ValidateDictionaryKeysIsNumberAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is IEnumerable<KeyValuePair<string, string>> keyValuePairs)
        {
            List<string> wrongKeys = new();
            foreach (KeyValuePair<string, string> item in keyValuePairs)
            {
                if (!int.TryParse(item.Key, out _))
                {
                    wrongKeys.Add($"'{item.Key}'");
                }
            }

            if (wrongKeys.Count > 0)
            {
                return new ValidationResult($"Next keys cannot be converted to int: {string.Join(", ", wrongKeys)}");
            }
        }

        return ValidationResult.Success;
    }
}
