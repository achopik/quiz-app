using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Quiz_Application.Services.Entities
{
  public  class Question:BaseEntity
    {
        public int QuestionType { get; set; }
        
        [Column(TypeName = "varchar(300)")]
        public string Text { get; set; }
        
        public Test Test { get; set; }
    }
}
