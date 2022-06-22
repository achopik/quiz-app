using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Quiz_Application.Web.Models
{

    public class AnswerViewModel
    {
        [JsonProperty("Id")]
        public string? Id { get; set; }
        
        [JsonProperty("Text")]
        public string Text { get; set; }
        
        [JsonProperty("IsCorrect")]
        public bool IsCorrect { get; set; }
    }

    public class QuestionViewModel
    {
        [JsonProperty("id")]
        public string? Id { get; set; }
        
        [JsonProperty("Text")]
        public string Text { get; set; }
        
        [JsonProperty("answers")]
        public IList<AnswerViewModel> answers { get; set; }
        
    }
    
    public class QuestionsViewModel
    {
        [JsonProperty("questions")]
        public IList<QuestionViewModel> questions { get; set; }
    }
}