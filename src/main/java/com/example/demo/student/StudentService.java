package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import com.example.demo.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        // check if email is taken
        Boolean emailExists = studentRepository.selectExistsEmail(student.getEmail());
        if (emailExists) {
            throw new BadRequestException("Email already exists!");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("Student does not exist!");
        }
        studentRepository.deleteById(studentId);
    }

    public void editStudent(Long studentId, Student updatedStudent) {
        // check if student exists
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        if (optionalStudent.isEmpty()) {
            throw new StudentNotFoundException("Student does not exist!");
        }

        Student student = optionalStudent.get();
        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());

        studentRepository.save(student);
    }
}
