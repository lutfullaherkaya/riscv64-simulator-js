#include "vox_lib.h"

  .global main
  .text
  .align 2

# fun main();
main:
  addi sp, sp, -8
  sd ra, 0(sp)
            # arg global_a
  ld a0, a_type
  ld a1, a_value
            # call "__vox_print__"
  call __vox_print__
            # return
  ld ra, 0(sp)
  addi sp, sp, 8
  li a0, 0
  ret

  .data
a_type:   .quad 0
a_value:  .quad 123

