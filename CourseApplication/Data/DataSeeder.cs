using CourseApplication.Models;
using Newtonsoft.Json;

namespace CourseApplication.Data
{
    public class DataSeeder
    {
        public static void SeedData(ApplicationDbContext applicationDbContext)
        {
            if (!applicationDbContext.Applications.Any())
            {
                var applications = new List<Application>()
                {
                    new Application()
                    {
                        CourseID = 1,
                        CourseDate = "2017-01-01",
                        CompanyName = "SecureSmarter",
                        CompanyPhoneNumber = 076234986,
                        CompanyEmail = "secure.smarter@gmail.com",
                        Participants = new List<Person> {
                            new Person()
                            {
                                Name = "John Doe",
                                Email = "john.doe@yahoo.com",
                                PhoneNumber = 075884091
                            },
                            new Person()
                            {
                                Name = "Jane Doe",
                                Email = "jane.doe@hotmail.com",
                                PhoneNumber = 072824091
                            }
                        }
                    },
                    new Application()
                    {
                        CourseID = 2,
                        CourseDate = "2017-05-27",
                        CompanyName = "SiteDept",
                        CompanyPhoneNumber = 077233956,
                        CompanyEmail = "site.dept@gmail.com",
                        Participants = new List<Person> {
                            new Person()
                            {
                                Name = "Alice Doe",
                                Email = "alice.doe@yahoo.com",
                                PhoneNumber = 078941091
                            }
                        }
                    }
                };

                applicationDbContext.AddRange(applications);
                applicationDbContext.SaveChanges();
            }
        }
    }
}
