using System.ComponentModel.DataAnnotations;

namespace FinBeatTestBackend.Data.Model;

public class DataItemModel
{
    [Key]
    public long Id { get; set; }

    public int Code { get; set; }

    [Required]
    public required string Value { get; set; }
}
