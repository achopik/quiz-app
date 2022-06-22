using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Quiz_Application.Services.Entities;

namespace Quiz_Application.Services.Repository.Interfaces
{
    public interface IQuestion<TEntity>
    {
        Task<List<Question>> GetQuestionList(int testId);       
        IQueryable<TEntity> SearchQuestion(Expression<Func<TEntity, bool>> search = null);
        EntityEntry AddQuestion(TEntity entity);
        EntityEntry UpdateQuestion(TEntity entity);
        EntityEntry DeleteQuestion(TEntity entity);
        EntityEntry DeleteQuestion(int id);
    }
}
