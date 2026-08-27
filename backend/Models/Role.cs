using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("id")]
        public long id { get; set; }

        [Column("name")]
        public string? name { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
