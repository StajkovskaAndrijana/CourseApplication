using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourseApplication.Models
{
    public class Application
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CourseID { get; set; }

        [Required]
        public string CourseDate { get; set; }

        [Required, Column(TypeName = "nvarchar(100)")]
        public string CompanyName { get; set; }

        [Required]
        public int CompanyPhoneNumber { get; set; }

        [Required, Column(TypeName ="nvarchar(75)")]
        public string CompanyEmail { get; set; }

        internal string _Participants { get; set; }

        [NotMapped]
        public List<Person> Participants
        {
            get { return _Participants == null ? null : JsonConvert.DeserializeObject<List<Person>>(_Participants); }
            set { _Participants = JsonConvert.SerializeObject(value); }
        }
    }

    public class Person
    {
        [Required, Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Required]
        public int PhoneNumber { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
