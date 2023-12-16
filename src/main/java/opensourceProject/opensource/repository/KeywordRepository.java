package opensourceProject.opensource.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import opensourceProject.opensource.domain.Keyword;
//import opensourceProject.opensource.domain.KeywordId;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    Optional<Keyword> findById(String id);

    Optional<Keyword> findByWord(String word);

    List<Keyword> findAll();
}