using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Love_Letter.Models;
using Love_Letter.ViewModel;

namespace Love_Letter.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Username);

                if (user != null)
                {
                    //sign  in
                    var signInresult = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
                    if (signInresult.Succeeded)
                        return RedirectToAction("Index");

                }
                
            }

            return View(model);
        }

        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {

            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    //sign  in
                    var signInresult = await _signInManager.PasswordSignInAsync(model.Username, model.Password, false, false);

                    if (signInresult.Succeeded)
                        return RedirectToAction("Index");

                    return View("Login");
                }
                else
                {
                    List<IdentityError> errorList = result.Errors.ToList();
                    string errors = "";
                    foreach (var error in errorList)
                    {
                        errors = errors + error.Description.ToString();
                    }
                    ModelState.AddModelError("Custom", errors);

                    return View(model);
                }

            }
            else
                return View(model);

        }

        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }
    }


}