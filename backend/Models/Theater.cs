using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("theater")]
    public class Theater
    {
        [Key]
        [Column("id")]
        public long id { get; set; }

        [Column("name")]
        public string? name { get; set; }

        [Column("location")]
        public string? location { get; set; }

        [Column("capacity")]
        public int capacity { get; set; }
    }
}
