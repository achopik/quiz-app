using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Quiz_Application.Web.Authentication;
using Quiz_Application.Services.Entities;
using Quiz_Application.Web.Models;
using Quiz_Application.Services.Repository.Interfaces;


namespace Quiz_Application.Web.Controllers

{
    public class TopicController : Controller
    {
        
        private readonly ITopic<Topic> _topic;
        public TopicController(ITopic<Topic> topic)
        {
            _topic = topic;
        }
        
        // GET
        public async Task<IActionResult> Index()
        {
            var topics = await _topic.GetTopicList();
            return View(topics);
        }
    }
}