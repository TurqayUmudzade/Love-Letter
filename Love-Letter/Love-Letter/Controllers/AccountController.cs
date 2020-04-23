using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Love_Letter.Models;
using Love_Letter.ViewModel;
using NETCore.MailKit.Core;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Love_Letter.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly Context _context;
        private readonly IEmailService _emailService;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, Context context,IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _emailService = emailService;
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
                var user = await _userManager.FindByEmailAsync(model.Username);

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

                    return Content(signInresult.ToString());
                   // return View("Login");
                }
                else
                {
                  
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("Custom", error.Description);
                    }

                    return View(model);
                }

            }
            else
                return View(model);

        }
        public async Task<IActionResult> VerifyEmail(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return BadRequest();

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return View();
            }

            return BadRequest();
        }

        public IActionResult EmailVerification() => View();

        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }
    }


}