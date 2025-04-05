using System.Text.Json;
using System.Text.Json.Serialization;
using FinBeatTestBackend.Service.DataItem.Dto;

namespace FinBeatTestBackend.Service.Converters;

public class DataItemConverter : JsonConverter<SetDataItemRequestDto>
{
    public override SetDataItemRequestDto Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException("Expected object start.");
        }

        reader.Read();
        if (reader.TokenType != JsonTokenType.PropertyName)
        {
            throw new JsonException("Expected property name.");
        }

        string key = reader.GetString()!;
        reader.Read();
        if (reader.TokenType != JsonTokenType.String)
        {
            throw new JsonException("Expected string value.");
        }

        string value = reader.GetString()!;
        reader.Read();
        if (reader.TokenType != JsonTokenType.EndObject)
        {
            throw new JsonException("Expected object end.");
        }

        return new SetDataItemRequestDto { Key = key, Value = value };
    }

    public override void Write(
        Utf8JsonWriter writer,
        SetDataItemRequestDto value,
        JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteString(value.Key, value.Value);
        writer.WriteEndObject();
    }
}
