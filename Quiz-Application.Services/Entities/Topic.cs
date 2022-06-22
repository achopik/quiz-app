using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_Application.Services.Entities
{
    public class Topic:BaseEntity
    {
        [Column(TypeName = "varchar(250)")]
        public string Name { get; set; }
        
        [Column(TypeName = "varchar(5000)")]
        public string Content { get; set; }
    }
}