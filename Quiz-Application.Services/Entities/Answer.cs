﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Quiz_Application.Services.Entities
{
   public class Answer:BaseEntity
    {
        public Question Question { get; set; }
        public string Text { get; set; }
        public bool IsCorrect { get; set; }
    }
}
