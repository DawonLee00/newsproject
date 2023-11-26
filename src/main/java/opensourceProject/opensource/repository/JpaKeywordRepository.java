package opensourceProject.opensource.repository;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import opensourceProject.opensource.domain.Keyword;

public class JpaKeywordRepository implements KeywordRepository {

    private final EntityManager em;

    public JpaKeywordRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Keyword save(Keyword keyword) {
        em.persist(keyword);
        return keyword;
    }

    @Override
    public Optional<Keyword> findById(String id) {
        List<Keyword> result = em.createQuery("select u from keyword u where u.id = :id", Keyword.class)
                .setParameter("id", id)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public Optional<Keyword> findByWord(String id, String word) {
        List<Keyword> result = em
                .createQuery("select k from keyword k where k.id = :id and k.word = :word", Keyword.class)
                .setParameter("word", word)
                .getResultList();

        return result.stream().findAny();
    }

    @Override
    public List<Keyword> findAll() {
        return em.createQuery("select k from Keyword k", Keyword.class)
                .getResultList();
    }

    @Override
    public void deleteByWord(String id, String word) {
        em.createQuery("delete from keyword k where k.id = :id and k.word = :word", Keyword.class)
                .getResultList();
    }
}
