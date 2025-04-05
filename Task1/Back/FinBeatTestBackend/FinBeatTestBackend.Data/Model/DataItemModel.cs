using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace FinBeatTestBackend.Data.Model;

[Index(nameof(Code), IsUnique = true)]
[Index(nameof(Value), IsUnique = true)]
public class DataItemModel
{
    [Key]
    public long Id { get; set; }

    public int Code { get; set; }

    [Required]
    [MaxLength(200)]
    public required string Value { get; set; }
}
