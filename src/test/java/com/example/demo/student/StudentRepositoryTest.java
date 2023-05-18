package com.example.demo.student;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    void selectExistsEmailTest_EmailExists() {
        String email = "Sultan@icloud.com";
        String name = "Sultan";
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );
        studentRepository.save(givenStudent);

        boolean exists = studentRepository.selectExistsEmail(email);

        assertThat(exists).isTrue();
    }

    @Test
    void selectExistsEmailTest_EmailDoesNotExist() {
        String email = "Sultan@icloud.com";

        boolean exists = studentRepository.selectExistsEmail(email);

        assertThat(exists).isFalse();
    }
}