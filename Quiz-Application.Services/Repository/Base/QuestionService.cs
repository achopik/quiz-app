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
    public class QuestionService<TEntity> : IQuestion<TEntity> where TEntity : BaseEntity
    {
       private readonly QuizDBContext _dbContext;
       private DbSet<TEntity> _dbSet;
       public QuestionService(QuizDBContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }

       public EntityEntry DeleteQuestion(TEntity entity)
       {
           var question = _dbContext.Question.Single(q => q.Id == entity.Id);
           _dbContext.Answer.RemoveRange(_dbContext.Answer.Where(a => a.Question == question));
           return _dbContext.Question.Remove(question);
       }
       public EntityEntry DeleteQuestion(int id)
       {
           var question = _dbContext.Question.Single(q => q.Id == id);
           _dbContext.Answer.RemoveRange(_dbContext.Answer.Where(a => a.Question == question));
           return _dbContext.Question.Remove(question);
       }

       public async Task<List<Question>> GetQuestionList(int testId)
       {
           return await _dbContext.Question.Where(q => q.Test.Id == testId).ToListAsync();
       }

       public EntityEntry AddQuestion(TEntity entity)
       {
           return _dbContext.Add(entity);
       }

       public IQueryable<TEntity> SearchQuestion(Expression<Func<TEntity, bool>> search = null)
        {
            IQueryable<TEntity> query = _dbSet;
            if (search != null)
            {
                query = query.Where(search);
            }
            return query;
        }

       public EntityEntry UpdateQuestion(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
