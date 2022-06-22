using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Quiz_Application.Web.Authentication;
using Quiz_Application.Services.Entities;
using Quiz_Application.Web.Models;
using Quiz_Application.Services.Repository.Interfaces;


namespace Quiz_Application.Web.Controllers
{    
    [BasicAuthentication]   
    public class AdminController : Controller
    {
        private readonly ILogger<TestController> _logger;
        private readonly ITest<Test> _test;
        private readonly IQuestion<Question> _question;
        private readonly IAnswer<Answer> _answer;
        public AdminController(ILogger<TestController> logger, ITest<Test> test, IQuestion<Question> question, IAnswer<Answer> answer)
        {
            _logger = logger;
            _test = test;
            _question = question;
            _answer = answer;
        }
        
        public async Task<IActionResult> Index()
        {
            IEnumerable<Test> lst = await _test.GetTestList();     
            return View(lst.ToList());
        }

        public IActionResult CreateTest()
        {
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateTest([FromForm] TestViewModel obj)
        {
            if (ModelState.IsValid)
            {
                Services.Entities.Test _testObj = new Services.Entities.Test()
                {
                    Name = obj.Name,
                    Description = obj.Description,
                    CreatedBy = "SYSTEM",
                    CreatedOn = DateTime.Now
                };
                await _test.AddTest(_testObj);
                return RedirectToAction(nameof(Index));
            }
            
            return View();
        }
        
        public async Task<IActionResult> EditTest(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
        
            var test = await _test.GetTest(id.Value);
            if (test == null)
            {
                return NotFound();
            }

            var questions = await _question.GetQuestionList(id.Value);
            var answers = new Dictionary<int, List<Answer>>();
            
            foreach (var question in questions)
            {
                answers[question.Id] = await _answer.GetAnswerList(question.Id);
            }
            
            ViewData["Questions"] = questions;
            ViewData["Answers"] = answers;
            
            return View(test);
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditTest(int id, [FromForm] Test test)
        {
            if (id != test.Id)
            {
                return NotFound();
            }
            
            if (ModelState.IsValid)
            {
                await _test.UpdateTest(test);
                return RedirectToAction(nameof(Index));
            }
            return View(test);
        }
        
        [HttpPatch]
        [Route("~/api/Tests/{testId?}")]
        
        public IActionResult EditTestQuestions([FromBody] object jsonData, int? testId)
        {
            var questionModel = JsonSerializer.Deserialize<QuestionsViewModel>(jsonData.ToString() ?? string.Empty);
            if (testId == null)
            {
                return NotFound();
            }
            
            return Ok();
        }
        
        public async Task<IActionResult> DeleteTest(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var testObj = await _test.GetTest(id.Value);
            await _test.DeleteTest(testObj);
            return RedirectToAction(nameof(Index));
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeleteAnswer(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var testObj = await _test.GetTest(id.Value);
            await _test.DeleteTest(testObj);
            return NoContent();
        }
        //
        // /// <summary>
        // /// Akcja usuwająca wybrany отдел firmy.
        // /// Zmiany są zapisywane w bazie danych.
        // /// </summary>
        // /// <param name="id">Numer ID usuwanego отдела.</param>
        // /// <returns>Widok listy отделов.</returns>
        // // POST: Departments/Delete/5
        // [HttpPost, ActionName("Delete")]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> DeleteConfirmed(int id)
        // {
        //     var department = await _context.Departments.FindAsync(id);
        //     var employeeManager = _context.Employees.Where(e => e.DepartmentManager.DepartmentManagerID == department.DepartmentManagerID).Single();
        //     employeeManager.IsDepartmentManager = false;
        //     _context.Employees.Update(employeeManager);
        //     await _context.SaveChangesAsync();
        //     _context.Departments.Remove(department);
        //     await _context.SaveChangesAsync();
        //     return RedirectToAction(nameof(Index));
        // }
        //
        // private bool DepartmentExists(int id)
        // {
        //     return _context.Departments.Any(e => e.DepartmentID == id);
        // }
    }
}
