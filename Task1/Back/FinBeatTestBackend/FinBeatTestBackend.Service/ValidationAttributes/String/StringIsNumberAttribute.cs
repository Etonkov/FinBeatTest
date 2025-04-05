using System.ComponentModel.DataAnnotations;

namespace FinBeatTestBackend.Service.ValidationAttributes.String;

public class StringIsNumberAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is string stringValue)
        {
            if (!int.TryParse(stringValue, out _))
            {
                return new ValidationResult($"Value {stringValue} cannot be converted to int.");
            }
        }

        return ValidationResult.Success;
    }
}
