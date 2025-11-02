using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Model
{
    public abstract class AbstractMappedEntity
    {
        [Column("created_at")]
        [JsonPropertyName("createdAt")] 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        [JsonPropertyName("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public void MarkCreated()
        {
            var now = DateTime.UtcNow;
            CreatedAt = now;
            UpdatedAt = now;
        }

        public void MarkUpdated()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
