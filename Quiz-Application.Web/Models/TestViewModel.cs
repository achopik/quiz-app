using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Quiz_Application.Web.Models
{
    public class TestViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
    }
}