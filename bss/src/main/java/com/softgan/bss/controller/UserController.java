package com.softgan.bss.controller;

import com.softgan.bss.model.User;
import com.softgan.bss.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        System.out.println("Get all Users...");

        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);

        return users;
    }

    @PostMapping(value = "/users/create")
    public User postUser(@RequestBody User user) {

        User _user = userRepository.save(new User(user.getFirstName(), user.getLastName(), user.isActive(), user.getCompany(), user.getSalary()));
        return _user;
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
        System.out.println("Delete User with ID = " + id + "...");

        userRepository.deleteById(id);

        return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping("/users/delete")
    public ResponseEntity<String> deleteAllUsers() {
        System.out.println("Delete All Users...");

        userRepository.deleteAll();

        return new ResponseEntity<>("All users have been deleted!", HttpStatus.OK);
    }

    @GetMapping(value = "users/lastName/{lastName}")
    public List<User> findByLastName(@PathVariable String lastName) {

        List<User> users = userRepository.findByLastName(lastName);
        return users;
    }

    @GetMapping(value = "/users/{id}")
    public Optional<User> findIdUsers(@PathVariable("id") long id) {
        Optional<User> user = userRepository.findById(id);

        return user;
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateCustomer(@PathVariable("id") long id, @RequestBody User user) {
        System.out.println("Update User with ID = " + id + "...");

        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setActive(user.isActive());
            _user.setCompany(user.getCompany());
            _user.setSalary(user.getSalary());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
