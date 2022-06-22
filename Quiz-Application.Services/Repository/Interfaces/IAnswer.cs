using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Quiz_Application.Services.Entities;

namespace Quiz_Application.Services.Repository.Interfaces
{
    public interface IAnswer<TEntity>
    {
        Task<List<Answer>> GetAnswerList(int testId);       
        IQueryable<TEntity> SearchAnswer(Expression<Func<TEntity, bool>> search = null);
        EntityEntry AddAnswer(TEntity entity);
        EntityEntry DeleteAnswer(TEntity entity);
        EntityEntry DeleteAnswer(int id);
    }
}
