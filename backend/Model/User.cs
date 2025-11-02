using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public long id { get; set; }
        [Column("username")]
        public string? username { get; set; }
        [Column("email")]
        public string? email { get; set; }
        [Column("password")]
        public string? password { get; set; }


    }
}
