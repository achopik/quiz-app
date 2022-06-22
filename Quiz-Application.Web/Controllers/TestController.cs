using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz_Application.Web.Authentication;
using Quiz_Application.Services.Entities;
using Quiz_Application.Web.Models;
using Quiz_Application.Services.Repository.Interfaces;


namespace Quiz_Application.Web.Controllers
{    
    [BasicAuthentication]   
    public class TestController : Controller
    {
        private readonly ILogger<TestController> _logger;
        private readonly ITest<Services.Entities.Test> _test;
        private readonly IQuestion<Services.Entities.Question> _question;
        public TestController(ILogger<TestController> logger, ITest<Services.Entities.Test> test, IQuestion<Services.Entities.Question> question)
        {
            _logger = logger;
            _test = test;
            _question = question;
        }
             
        [HttpGet]
        [Route("~/api/Tests")]
        public async Task<IActionResult> Tests()
        {           
            try
            {
                IEnumerable<Test> lst = await _test.GetTestList();               
                return Ok(lst.ToList());
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }
        
        

        [HttpGet]
        [Route("~/api/Tests/{testId?}")]
        public async Task<IActionResult> Test(int testId)
        {
            try
            {
                Test exm = await _test.GetTest(testId);
                return Ok(exm);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        [HttpGet]
        [Route("~/api/Questions/{testId?}")]
        public async Task<IActionResult> Questions(int testId)
        {
            try
            {
                List<Question> _obj = await _question.GetQuestionList(testId);
                return Ok(_obj);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }
        
        [HttpDelete]
        [Route("~/api/Questions/{id?}")]
        public IActionResult DeleteQuestion(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            _question.DeleteQuestion(id.Value);
            return NoContent();
        }


        // [HttpPost]
        // [Route("~/api/Score")]       
        // public async Task<IActionResult> Score(List<Option> objRequest)
        // {
        //     int i = 0;
        //     bool IsCorrect = false;
        //     List<Result> objList = null;
        //     string _SessionID = null;
        //     try
        //     {               
        //         if (objRequest.Count > 0)
        //         {
        //             _SessionID = Guid.NewGuid().ToString() + "-" + DateTime.Now;
        //             objList = new List<Result>();
        //             foreach (var item in objRequest)
        //             {
        //                 if (item.AnswerID == item.SelectedOption)
        //                     IsCorrect = true;
        //                 else
        //                     IsCorrect = false;
        //
        //                 Result obj = new Result()
        //                 {
        //                     CandidateID = item.CandidateID,
        //                     ExamID = item.ExamID,
        //                     QuestionID = item.QuestionID,
        //                     AnswerID = item.AnswerID,
        //                     SelectedOptionID = item.SelectedOption,
        //                     IsCorrent = IsCorrect,
        //                     SessionID= _SessionID,
        //                     CreatedBy = "SYSTEM",
        //                     CreatedOn = DateTime.Now
        //                 };
        //                 objList.Add(obj);
        //             }
        //             i = await _result.AddResult(objList);
        //         }
        //        
        //     }
        //     catch (Exception ex)
        //     {
        //         i = 0;
        //         throw new Exception(ex.Message, ex.InnerException);           
        //     }
        //     finally
        //     {                
        //     }
        //     return Ok(i);
        // }
        
    }
}
