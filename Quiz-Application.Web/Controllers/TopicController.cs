using Microsoft.AspNetCore.Mvc;

namespace Quiz_Application.Web.Controllers
{
    public class TopicController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}