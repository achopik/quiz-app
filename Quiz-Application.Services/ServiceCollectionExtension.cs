using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Quiz_Application.Services.Repository.Interfaces;
using Quiz_Application.Services.Repository.Base;


namespace Quiz_Application.Services
{
   public static class ServiceCollectionExtension
    {        
       public static IServiceCollection AddServices(this IServiceCollection services)
       {
           return services
               .AddScoped<ICandidate<Entities.Candidate>, CandidateService<Entities.Candidate>>()
               .AddScoped<ITest<Entities.Test>, TestService<Entities.Test>>()
               .AddScoped<IQuestion<Entities.Question>, QuestionService<Entities.Question>>()
               .AddScoped<IAnswer<Entities.Answer>, AnswerService<Entities.Answer>>()
               .AddScoped<ITopic<Entities.Topic>, TopicService<Entities.Topic>>();
       }
    }
}
