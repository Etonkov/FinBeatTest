using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FinBeatTestBackend.Service.Converters;
using FinBeatTestBackend.Service.ValidationAttributes.String;

namespace FinBeatTestBackend.Service.DataItem.Dto;

[JsonConverter(typeof(DataItemConverter))]
public class SetDataItemRequestDto
{
    [Required]
    [StringIsNumber]
    public required string Key { get; set; }

    [Required]
    [MaxLength(200)]
    public required string Value { get; set; }
}
