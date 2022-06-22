using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_Application.Services.Entities
{
    public  class Result:BaseEntity
    {
        public Candidate Candidate { get; set; }        
        public Test Test { get; set; }
        public int Score { get; set; }
    }
}
