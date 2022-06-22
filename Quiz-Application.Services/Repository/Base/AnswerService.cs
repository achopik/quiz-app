using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Quiz_Application.Services.Entities;
using Quiz_Application.Services.Repository.Interfaces;

namespace Quiz_Application.Services.Repository.Base
{
    public class AnswerService<TEntity> : IAnswer<TEntity> where TEntity : BaseEntity
    {
       private readonly QuizDBContext _dbContext;
       private DbSet<TEntity> _dbSet;
       public AnswerService(QuizDBContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }

       public EntityEntry DeleteAnswer(TEntity entity)
       {
           var answer = _dbContext.Answer.Single(q => q.Id == entity.Id);
           return _dbContext.Answer.Remove(answer);
       }
       
       public EntityEntry DeleteAnswer(int id)
       {
           var answer = _dbContext.Answer.Single(q => q.Id == id);
           return _dbContext.Answer.Remove(answer);
       }
       
       public async Task<List<Answer>> GetAnswerList(int questionId)
       {
           return await _dbContext.Answer.Where(q => q.Question.Id == questionId).ToListAsync();
       }

       public EntityEntry AddAnswer(TEntity entity)
       {
           return _dbContext.Add(entity);
       }

       public IQueryable<TEntity> SearchAnswer(Expression<Func<TEntity, bool>> search = null)
        {
            IQueryable<TEntity> query = _dbSet;
            if (search != null)
            {
                query = query.Where(search);
            }
            return query;
        }

       public EntityEntry UpdateAnswer(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
