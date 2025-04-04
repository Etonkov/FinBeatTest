using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FinBeatTestBackend.Data.Helpers;

// ReSharper disable once ClassNeverInstantiated.Global
public class AnnotationHelper
{
    public static string TableName<T>(DbSet<T> dbSet) where T : class
    {
        IEntityType? entityType = dbSet.EntityType;
        return GetName(entityType);
    }

    private static string GetName(IEntityType entityType)
    {
        object? schema = entityType.FindAnnotation("Relational:Schema")?.Value;
        string? tableName = entityType.GetAnnotation("Relational:TableName").Value?.ToString();

        if (schema == null)
        {
            return $@"""{tableName}""";
        }

        return $@"""{schema}"".""{tableName}""";
    }
}
