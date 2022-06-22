using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Quiz_Application.Services.Repository.Interfaces
{
    public interface ITest<TEntity>
    {
        Task<IEnumerable<TEntity>> GetTestList();
        Task<TEntity> GetTest(int id);
        Task<IQueryable<TEntity>> SearchTest(Expression<Func<TEntity, bool>> search = null);
        Task<int> AddTest(TEntity entity);
        Task<int> UpdateTest(TEntity entity);
        Task<int> DeleteTest(TEntity entity);
       
    }
}
